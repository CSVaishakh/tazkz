import React from "react";

export default function homeLayout() {
    return(
        <section>
            <div id = "first section">
                <div id ="ongoing tasks">
                    <div id = "task n"></div>
                </div>
                <div id ="completed tasks">
                    <div id = "task n"></div>
                </div>
            </div>
            <div id="tasks wrt to priority">{/*from left(highest priority) to right(lowest priority*/}
                <div id = "task n"></div>
            </div>
            <div id = "tasks wrt to deadline">{/*from left(nearest to deadline) to right(farthest from deadline*/}
                <div id = "task n"></div>
            </div>
        </section>
    );
};