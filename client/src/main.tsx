import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from "@mui/material";
import {HelmetProvider} from "react-helmet-async";
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(

  //<React.StrictMode>

    <HelmetProvider>
      <CssBaseline/>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HelmetProvider>,

  //</React.StrictMode>,
)
