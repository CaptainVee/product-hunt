import React from 'react';

import classes from './SideCard.module.css';
import Product from '../Product/Product';

const SideCard = () => {
    return (
<div>
        <div className={classes.Card}>
        <div class="content-section">
        <h3>Our Sidebar</h3>
            <p class='text-muted'>You can put any information here you'd like.
            <ul class="list-group">
                <li class="list-group-item list-group-item-light">Latest Posts</li>
                <li class="list-group-item list-group-item-light">Announcements</li>
                <li class="list-group-item list-group-item-light">Calendars</li>
                <li class="list-group-item list-group-item-light">etc</li>
            </ul>
            </p>
        </div>
        </div>
        <Product/>
    </div>
    );
}

export default SideCard;