import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from './AppContainer';

describe('AppContainer', () => {
    let wrapper = shallow(<AppContainer />);

    it('Renders App', () => {
        expect(wrapper.find('App').length).toEqual(1);
    });

    it('Wraps App into StylesProvider with injectFirst property', () => {
        expect(wrapper.find('StylesProvider[injectFirst] App').length).toEqual(1);
    });

    it('Wraps App into store Provider', () => {
        expect(wrapper.find('Provider[store] App').length).toEqual(1);
    });

    it('Renders GlobalStyle', () => {
        expect(wrapper.find('GlobalStyle').length).toEqual(1);
    });
});
