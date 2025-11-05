import { Button } from '@/components/ui/button';
import { getFlyerByChild } from '@/data/getFlyer';
import React, { useEffect, useState } from 'react';
import EditFlyerForm from './edit-flyer-form';
import { X } from "lucide-react";
import './flyer-info-popup.css';
import { useRouter } from "next/navigation";

export default function FlyerInfoPopup ({ show, handleClose, childId }) {
        const showHideClassName = show ? 'modal display-block' : 'modal display-none';
        const [isFirst, setIsFirst] = useState(true);
        const [isNew, setIsNew] = useState(false);
        const [flyer, setFlyer] = useState({});

        const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          if (show && isFirst) {
            setIsFirst(false);
            let flyer2 = await getFlyerByChild(childId);
            if (!flyer2) {
                setIsNew(true);
                flyer2 = {}; 
            } else {
             setIsNew(false); 
            }
            setFlyer(flyer2);
          }
        }
        fetchData();
      }, [childId, show, isNew]);

      const yes = () => {
        setIsNew(true);
      }

      const no = () => {
        setIsFirst(true);
        handleClose();
        router.push(`/dashboard/children/flyers/${childId}`);
      }

      const toClose = () => {
        setIsFirst(true);
        handleClose();
      }

        return (
          <div className={showHideClassName}>
            <section className="modal-main">
              <div style={{display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue'}}>
                <h1 style={{padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700}}>
                  {isNew ? "MISSING CHILD INFO" : "FLYER EXISTS"}
                </h1>
                <Button size="icon" style={{background: 'transparent', color: 'black'}}
                onClick={toClose}><X /></Button>
              </div>
              <br/><br/>
              {isNew ? <EditFlyerForm flyer={flyer} childId={childId}/> :
                <>
                  <div>A flyer already exists for this child. Do you wish to edit this information?</div>
                  <br/><br/>
                  <div style={{float: 'right', display: 'flex', gap: '5px'}}>
                  <Button variant="outline" onClick={yes} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    Yes
                  </Button>
                  <Button variant="outline" onClick={no} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    No
                  </Button>
                  </div>
                </>
              }
            </section>
          </div>
        );
      }