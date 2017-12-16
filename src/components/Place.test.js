import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Place from './Place';

describe('Place', () => {
    test('should render correctly', () => {
        const place = shallow(<Place place={{name: 'testing', location: {coordinates:[0,0]}}} />);
        expect(shallowToJson(place)).toMatchSnapshot();
    });
});