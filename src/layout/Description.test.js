import 'jsdom-global/register';
import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Description from './Description';

describe('Description', () => {
    let description, props, onClickIcon, state;
    beforeAll(() => {
        props = {place:{name:'TESTING'}};
        onClickIcon = jest.fn();
        state = {activeTab:'JS'};

        description = {};
        description.render = () => {
            return shallow(<Description
            onClickOnIcon={onClickIcon}
            activeTab={state.activeTab}
            {...props} />);
        };

    });

    test('renders correctly', () => {
        expect(shallowToJson(description.render())).toMatchSnapshot();
    });

    test('title has good value',() => {
        const title = description.render().find('a').text();
        expect(title).toEqual(props.place.name);
    });

    test('first icon has active class if activeTab is "JS"',() => {
        const icon = description.render().find('i.icon').first();
        expect(icon.hasClass('active')).toBeTruthy();
    });

    test('second icon has active class if activeTab is "MAP"',() => {
        state.activeTab = 'MAP';
        const icon = description.render().find('i.ion-ios-location-outline');
        expect(icon.hasClass('active')).toBeTruthy();
    });

    test('last icon has active class if activeTab is "IMAGE"',() => {
        state.activeTab = 'IMAGE';
        const icon = description.render().find('i.icon').last();
        expect(icon.hasClass('active')).toBeTruthy();
    });

    test('click on one if the last icon is calling onClickIcon function',() => {
        const icon = description.render().find('i.icon').last();
        icon.simulate('click');
        expect(onClickIcon).toHaveBeenCalled();
    });
});
