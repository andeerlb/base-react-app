import './App.css';
import Body from './components/body/Body';
import LoaderProvider from './contexts/LoaderContext';
import SidebarProvider from './contexts/SidebarContext';
import { BrowserRouter } from "react-router-dom";
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoaderProvider>
          <SidebarProvider>
            <Body />
          </SidebarProvider>
        </LoaderProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
