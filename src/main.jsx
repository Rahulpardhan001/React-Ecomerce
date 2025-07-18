// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { store } from './redux/store';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <ToastContainer />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer   position="bottom-right"   toastOptions={{
    className: '',
    duration: 1000,}} />
      </BrowserRouter>
    </Provider>
    </React.StrictMode>
);
