import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [updateTitle, setUpdateTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  //-------------------------------------------------------
  const [newMovie, setNewMovie] = useState({
    title: "",
    releaseDate: 0,
    receivedAnOscar: false,
  });
  //-------------------------------------------------------
  const [fileUpload, setFileUpload] = useState(null);

  console.log(auth?.currentUser?.email);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        ...newMovie,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updateTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    console.log("test")
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="App">
        <Auth />
        {/* {auth.currentUser?  <div className="body">
          <div>
            <input
              type="text"
              placeholder="Movie Title"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Release Date"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  releaseDate: Number(e.target.value),
                }))
              }
            />
            <input
              type="checkbox"
              checked={newMovie.receivedAnOscar}
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  receivedAnOscar: !prev.receivedAnOscar,
                }))
              }
            />
            <label>Received an oscar</label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
          </div>
          <div>
            {movieList.map((movie) => (
              <div>
                <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                  {movie.title}
                </h1>
                <p>Date: {movie.releaseDate}</p>
                <button onClick={() => deleteMovie(movie.id)}>
                  Delete Movie
                </button>
                <input
                  type="text"
                  placeholder="New Title"
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <button onClick={() => UpdateMovieTitle(movie.id)}>
                  Update Title
                </button>
              </div>
            ))}
          </div>
        </div>
        : <p>please Log in</p>} */}
        <div className="body">
          <div>
            <input
              type="text"
              placeholder="Movie Title"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Release Date"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  releaseDate: Number(e.target.value),
                }))
              }
            />
            <input
              type="checkbox"
              checked={newMovie.receivedAnOscar}
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  receivedAnOscar: !prev.receivedAnOscar,
                }))
              }
            />
            <label>Received an oscar</label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
          </div>
          <div>
            {movieList.map((movie) => (
              <div>
                <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                  {movie.title}
                </h1>
                <p>Date: {movie.releaseDate}</p>
                <button onClick={() => deleteMovie(movie.id)}>
                  Delete Movie
                </button>
                <input
                  type="text"
                  placeholder="New Title"
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <button onClick={() => UpdateMovieTitle(movie.id)}>
                  Update Title
                </button>
              </div>
            ))}
          </div>
        </div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={ uploadFile}>Upload file</button>
      </div>
    </>
  );
}

export default App;
