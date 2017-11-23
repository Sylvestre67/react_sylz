import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Wrapper from './Wrapper';

describe('Mask', () => {
    test('Mask component', () => {
        const wrapper = shallow(<Wrapper>(<p>Testing</p>)</Wrapper>);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});