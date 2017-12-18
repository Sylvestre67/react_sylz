import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Photo from './Photo';

describe('Photo', () => {
    let props, photo;
    beforeAll(() => {
        props = {
            place:{
                name:'testing',
                instagram_url: 'testing'
            }
        };
        photo = shallow(<Photo {...props} />);
    });

    test('should render correctly', () => {
        expect(shallowToJson(photo)).toMatchSnapshot();
    });

    test('should have the instagram_urlized image on the background', () => {
        let json_photo = shallowToJson(photo);
        expect(json_photo.node.props.style.backgroundImage).toEqual('url(\"testing\")');
    });
});