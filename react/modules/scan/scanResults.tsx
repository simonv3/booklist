import React, { FunctionComponent, useEffect, useState, useReducer, Suspense } from "react";

import { useTransition, config, animated } from "react-spring";
import { SlideInContents } from "app/animationHelpers";
import FlowItems from "app/components/layout/FlowItems";
import { CoverSmall } from "app/components/bookCoverComponent";

function scanReducer(state, [type, payload]) {
  switch (type) {
    case "initial":
      return { ...state, pending: payload.pending };
    case "pendingBookAdded":
      return { ...state, pending: state.pending + 1 };
    case "bookAdded":
      return { ...state, pending: state.pending - 1, booksSaved: [{ success: true, ...payload }].concat(state.booksSaved).slice(0, 3) };
    case "bookLookupFailed":
      let failure = { _id: "" + new Date(), title: `Failed lookup for ${payload.isbn}`, success: false };
      return { ...state, pending: state.pending - 1, booksSaved: [failure].concat(state.booksSaved).slice(0, 15) };
  }
  return state;
}

const ScanResults: FunctionComponent<{}> = props => {
  const [showIncomingQueue, setShowIncomingQueue] = useState(false);
  const [{ pending, booksSaved: booksJustSaved }, dispatch] = useReducer(scanReducer, { pending: 0, booksSaved: [] });

  const toggleIncomingQueue = () => setShowIncomingQueue(!showIncomingQueue);

  const toggleClass = showIncomingQueue ? "fa-angle-double-up" : "fa-angle-double-down";

  const toggleShow =
    booksJustSaved.length || pending ? (
      <a onClick={() => toggleIncomingQueue()} className="margin-left-xs">
        <i style={{ color: "white" }} className={`fa fa-white ${toggleClass}`} />
      </a>
    ) : null;

  const booksJustSavedTransition = useTransition(booksJustSaved, {
    config: config.stiff,
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    function sendIt({ detail }: any) {
      dispatch([detail.type, detail.packet]);
    }

    window.addEventListener("ws-info", sendIt);
    window.dispatchEvent(new CustomEvent("sync-ws"));
    return () => window.removeEventListener("ws-info", sendIt);
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <div>
        {pending == null ? null : pending ? (
          <span className="label label-info">
            {`${pending} Book${pending === 1 ? "" : "s"} currently outstanding`} {toggleShow}
          </span>
        ) : (
          <span className="label label-success">All pending books saved {toggleShow}</span>
        )}
      </div>

      <SlideInContents clamp={true} in={showIncomingQueue} immediateChanges={true} opacity={true} style={{ marginTop: "10px" }}>
        <div className="alert alert-info alert-slim" style={{ marginBottom: "15px" }}>
          Your entered and failed books will show up here, briefly, although everything is being logged. Eventually there'll be a dedicated place to
          see what's been saved, and what failed to be found.
        </div>

        <div style={{ marginBottom: 0 }}>
          {booksJustSavedTransition((styles, book) => (
            <Suspense fallback={null}>
              <div className="auto-fade-in margin-bottom">
                <animated.div
                  className="border-bottom padding-bottom"
                  style={{ display: "flex", flexDirection: "row", color: book.success ? "var(--neutral-text)" : "red", ...styles }}
                >
                  <div style={{ minWidth: "90px" }}>
                    <CoverSmall url={book.smallImage} />
                  </div>
                  <span>{book.title}</span>
                </animated.div>
              </div>
            </Suspense>
          ))}
        </div>
      </SlideInContents>
    </div>
  );
};

export default ScanResults;
