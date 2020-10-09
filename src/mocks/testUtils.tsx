import React, { ReactNode } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import mockStore from 'src/mocks/mockStore';

export async function mountWithProviders(children: ReactNode) {
    const store = mockStore();

    let wrapper: ReactWrapper;
    await act(async () => {
        wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>{children}</Provider>
            </React.StrictMode>,
        );
    });

    return wrapper!;
}

export const flushPromises = async (nTimes: number = 1) => {
    let n = 0;
    while (n < nTimes) {
        await new Promise(setImmediate);
        n++;
    }
};
