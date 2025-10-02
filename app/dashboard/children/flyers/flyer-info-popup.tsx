import { Button } from '@/components/ui/button';
import { getFlyerByChild } from '@/data/getFlyer';
import React, { useEffect, useState } from 'react';
import EditFlyerForm from './edit-flyer-form';
import { CircleX } from "lucide-react";
import './flyer-info-popup.css';

export default function FlyerInfoPopup ({ show, handleClose, childId }) {
        const showHideClassName = show ? 'modal display-block' : 'modal display-none';
        const [isNew, setIsNew] = useState(false);
        const [flyer, setFlyer] = useState({});

    useEffect(() => {
        async function fetchData() {
            let flyer2 = await getFlyerByChild(childId);
            if (!flyer2) {
                setIsNew(true);
                flyer2 = {}; 
            } 
            setFlyer(flyer2);
        }
        fetchData();
      }, [childId, show]);
      
        return (
          <div className={showHideClassName}>
            <section className="modal-main">
              <div style={{display: 'inline-flex'}}>
                <h1 style={{padding: '10px 1px', margin: '15px 260px 15px 2px'}}>Missing Child Info</h1>
                {/* <button type="button" className="close-btn" onClick={handleClose}>x</button>  */}
                <Button size="icon" style={{background: 'transparent', color: 'black'}}
                onClick={handleClose}><CircleX /></Button>
              </div>
              {/* {children} */}
              <EditFlyerForm flyer={flyer} isNew={isNew}/>
            </section>
          </div>
        );
      }

// export default FlyerInfoPopup;
