import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Place from './Place';

describe('Place', () => {
    test('Place component', () => {
        const place = shallow(<Place place={{name: 'testing'}} />);
        expect(shallowToJson(place)).toMatchSnapshot();
    });

});