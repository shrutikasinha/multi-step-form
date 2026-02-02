import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import { FormProvider } from './context/FormContext';
import Form from './pages/Form';
import Success from './pages/Success';
import './i18n/config';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FormProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#f59837',
              fontFamily: 'Nunito, sans-serif',
              borderRadius: 8,
            },
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </Router>
        </ConfigProvider>
      </FormProvider>
    </Provider>
  );
};

export default App;
