import './App.css';
import Card from './components/Card/Card';

function App() {
  return (
    <div>
      <Card
          name='Sydney'
          phone="111-111-1111"
          email='laith@hotmail.com'
          image={{url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', alt: 'cute cat'}}
          favored={false}

      />
    </div>
  );
}

export default App;
