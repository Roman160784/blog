import React, { useEffect } from 'react';

export const Posts = () => {
    return (
        <div>
            <div>
                <h3 className={''}>Blogs</h3>
                <hr />
            </div>
            <div className={''}>
                <select className={''} name="blabla" id="1">
                    <option value="value1">New posts first</option>
                    <option value="value1">Old posts first</option>
                </select>
            </div>
            <div>
                <div>
                    <div>
                        <img src="https://st2.depositphotos.com/1006899/8421/i/600/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg" alt="post picture" />
                    </div>
                    <div>
                    <div>
                        <img src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg" alt="avatar" />
                    </div>
                    <div>
                    <h5>Post name</h5>
                    </div>
                    <div>
                        <span>Discription</span>
                    </div>
                    <div>
                        <span>Date</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}