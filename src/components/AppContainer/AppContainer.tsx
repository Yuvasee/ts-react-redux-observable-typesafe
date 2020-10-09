import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import GlobalStyle from 'src/globalStyle';
import store from 'src/store';
import App from 'src/components/App/App';

const AppContainer = () => (
    <React.StrictMode>
        <StylesProvider injectFirst>
            <Provider store={store}>
                <GlobalStyle />
                <App />
            </Provider>
        </StylesProvider>
    </React.StrictMode>
);

export default AppContainer;
