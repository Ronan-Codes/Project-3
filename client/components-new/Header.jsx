import React from 'react';

function Header() {
    return (
        <header class="columns column is-four-fifths is-multiline dropShadow">
                <div class="column is-full browseBg has-text-centered has-text-light">
                    Browse
                </div>

                <div class="column is-full browseContainer">
                    <form class="column columns is-vcentered has-text-centered is-multiline" id="browseForm">
                        <div class="column is-one-half genreContainer">

                            <div class="columns is-centered">

                                <div class="field is-horizontal column is-three-fifths">
                                    <div class="field-label is-normal">
                                        <label class="label">Genre</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Portrait</option>
                                                        <option>Street</option>
                                                        <option>Events</option>
                                                        <option>Nature</option>
                                                        <option>Product</option>
                                                        <option>Travel</option>
                                                        <option>Weddings</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="column is-one-half">

                            <div class="columns is-centered">

                                <div class="field is-horizontal column is-three-fifths">
                                    <div class="field-label is-normal">
                                        <label class="label">Filter:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Most Recent</option>
                                                        <option>Most Liked</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="column is-full">
                            <div class="field has-text-centered">
                                <button class="button is-success" id="searchBtn">
                                    Search
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </header>
    )
}

export default Header;