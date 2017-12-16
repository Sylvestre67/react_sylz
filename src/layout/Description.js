import React from 'react';
import PropTypes from 'prop-types';

import './description.css';

function Description(props) {

    const tabs = {
        JS: 'ion-social-javascript-outline',
        MAP: 'ion-ios-location-outline',
        IMAGE: 'ion-image'
    };

    const onKeyPressHandler = () => {return null};

    const setClassOfIcon = (iconClass, tab, activeTab) => {
        let classes = ["icon", iconClass];
        if(activeTab === tab){classes.push('active')}
        return classes.join(' ');
    };

    // TODO: Create IconTab component.
    const renderTabsIcons = () => {
       return Object.keys(tabs).map((key,index) => {
            return (<i role="button"
                       tabIndex={index}
                       key={[key,index].join(']_')}
                       onClick={(e) => { props.onClickOnIcon(key, e) }}
                       onKeyPress={onKeyPressHandler}
                       className={setClassOfIcon(tabs[key], key, props.activeTab)}/>)
        });
    };

    return (
        <div className="description">
            <a href={'/#/'}>{props.place.name.replace('_', ' ')}</a>
            {renderTabsIcons()}
        </div>
    );
}

Description.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    onClickOnIcon: PropTypes.func.isRequired, //eslint-disable-line
    activeTab: PropTypes.string.isRequired //eslint-disable-line
};
Description.defaultProps = {};

export default Description;
