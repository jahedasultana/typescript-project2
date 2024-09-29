import Create from "./components/Create";
import Read from "./components/Read";


const App = () => {
  return (
   <div>
    <h1 className="text-center text-3xl font-bold py-6 mb-5 bg-green-500">Hallo World</h1>
     <div className="space-y-10">
      <Create></Create>
      <Read></Read>
    </div>
   </div>
  );
};

export default App;