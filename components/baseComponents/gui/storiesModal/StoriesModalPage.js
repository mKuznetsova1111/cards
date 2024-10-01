import React from "react";
import {safeHTML} from "../../../../utils/safeHTML";


const StoriesModalPage = React.forwardRef(
  function StoriesModalPage({
                              image = "",
                              text = "text",
                              title = "title",
                              background_color = "#ffffff",
                              text_color = "#ffffff",
                            }, ref) {

    return (
      <div className={"stories-modal__page"} ref={ref}
           style={{
             backgroundColor: background_color,
             color: text_color
           }}
      >
        <div className="stories-modal__page-image">
          <img src={image} alt=""/>
        </div>
        <div className="stories-modal__page-content">
          {title && <div className="stories-modal__page-title">{safeHTML(title)}</div>}
          {text && <div className="stories-modal__page-text">{safeHTML(text)}</div>}
        </div>
      </div>

    );
  });
export default StoriesModalPage;
StoriesModalPage.propTypes = {};

