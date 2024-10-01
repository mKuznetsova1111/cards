import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";

export default function Load({isSpin, isSpin2, isPoints, isPoints2, isPoints3, isPoints4, isHalf, isPulse, isCube, isCube2, text}) {
  return (
    <>
      <div 
        className={classNames('load',
          { 'load_spin': isSpin },
          { 'load_spin-2': isSpin2 },
          { 'load_points': isPoints},
          { 'load_points-2': isPoints2 },
          { 'load_points-3': isPoints3 },
          { 'load_points-4': isPoints4 },
          { 'load_half': isHalf },
          { 'load_pulse': isPulse },
          { 'load_cube': isCube },
          { 'load_cube-2': isCube2 },
          { 'load_text': text }
        )}
        style={{"--text": text}}
      >
        {text && text}
        {text && <span className={"load__inner"}>{text}</span> }
      </div>
    </>
  )
}
 