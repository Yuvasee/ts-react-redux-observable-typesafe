import React from 'react';
import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import App from './App';
import { mountWithProviders, flushPromises } from 'src/mocks/testUtils';
import { mockApi } from 'src/mocks/mockApi';

describe('App integration tests', () => {
    let wrapper: ReactWrapper;

    async function prepareWrapper() {
        mockApi();
        wrapper = await mountWithProviders(<App />);
    }

    it('Renders without failing', async () => {
        await prepareWrapper();
        expect(wrapper.length).toBeTruthy();
    });

    it('On button click fetches and displays data', async () => {
        await prepareWrapper();
        await act(async () => {
            wrapper.find('[className="MuiButton-label"]').simulate('click');
        });
        wrapper.update();

        expect(wrapper.find('p').length).toEqual(5);
    });

    it('Shows spinner while fetching data', async () => {
        await prepareWrapper();
        wrapper.find('[className="MuiButton-label"]').simulate('click');

        expect(wrapper.find('[className^="MuiCircularProgress-circle"]').length).toEqual(1);

        await act(async () => {
            flushPromises();
        });
    });
});
