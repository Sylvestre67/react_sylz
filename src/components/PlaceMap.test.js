import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import PlaceMap from './PlaceMap';

describe('PlaceMap', () => {
    let placeMap, props;
    beforeAll(() => {
        props = {

        };
        placeMap = shallow(<PlaceMap {...props} />);
    });

    test('PlaceMap  should render correctly', () => {
        expect(shallowToJson(placeMap)).toMatchSnapshot();
    });

});