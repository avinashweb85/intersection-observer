import './App.css';
import useInfinite from './hooks/useInfinite';

function App() {
  const [getImage, photos] = useInfinite();

  return (
    <div className="App" ref={getImage}>
      {
        photos?.map((photo) => (
          <img src={photo?.url} alt='photos' key={photo?.id} className='image-post' />
        ))
      }
    </div>
  );
}

export default App;
