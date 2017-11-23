import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Mask from './Mask';

describe('Mask', () => {
    test('Mask component', () => {
        const mask = shallow(<Mask />);
        expect(shallowToJson(mask)).toMatchSnapshot();
    });

});

