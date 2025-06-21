import React, { useState } from "react";
import "./Toggle.css";

function Toggle({ 
  options = ['objects', 'nature'], 
  initialValue = null, 
  onChange = () => {},
}) {
  const [activeState, setActiveState] = useState(initialValue || options[0]);

  const handleStateChange = (newState) => {
    setActiveState(newState);
    onChange(newState);
  };

  const activeIndex = options.indexOf(activeState);
  const slidePercentage = (100 / options.length) * activeIndex;

  return (
    <div className={'toggle-container'}>
      <div
        className="toggle-sliding-bg"
        style={{
          width: `${100 / options.length}%`,
          left: `calc(${slidePercentage}% + var(--toggle-container-padding))`
        }}
      ></div>
      
      <div className="toggle-btn-row">
        {options && options.map((option, index) => (
          <div key={option} className="toggle-btn-wrapper">
            <button
              onClick={() => handleStateChange(option)}
              className={`toggle-btn${activeState === option ? " active" : ""}`}
              onMouseEnter={e => {
                if (activeState !== option) {
                  e.target.classList.add("hover");
                }
              }}
              onMouseLeave={e => {
                if (activeState !== option) {
                  e.target.classList.remove("hover");
                }
              }}
            >
              {option}
            </button>
            {/* Divider line for each option */}
           {index < options.length - 1 && (
              <div className="toggle-divider"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toggle;