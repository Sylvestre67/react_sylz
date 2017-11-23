import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Fresque from './Fresque';

describe('Fresque', () => {
    test('Fresque component', () => {
        const fresque = shallow(<Fresque place={{name: 'testing'}} />);
        expect(shallowToJson(fresque)).toMatchSnapshot();
    });
});