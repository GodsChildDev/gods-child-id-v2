import { Button } from '@/components/ui/button';
import { getFlyerByChild } from '@/data/getFlyer';
import React, { useEffect, useState } from 'react';
import EditFlyerForm from './edit-flyer-form';
import { X } from "lucide-react";
import './contact-popup.css';
import { Input } from '@/components/ui/input';

export default function ContactPopup({ show, handleClose, type, value }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [sendValue, setSendValue] = useState(value);

  useEffect(() => {
    async function fetchData() {
      if (show) {
        setSendValue(value);
      }
    }
    fetchData();
  }, [show]);

  const yes = () => {
    handleClose(type, sendValue);
  }

  const no = () => {
    handleClose();
  }

  const toClose = () => {
    handleClose();
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue' }}>
          <h1 style={{ padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700 }}>
            {type === 'email' ? "EMAIL FLYER" : "TEXT FLYER"}
          </h1>
          <Button size="icon" style={{ background: 'transparent', color: 'black' }}
            onClick={toClose}><X /></Button>
        </div>
        <br /><br />
        <Input className='w-100' type="text" value={sendValue} onChange={(e) => setSendValue(e.target.value)} />
        {type === 'text' &&
        <div>
          <br/>
          <h3>Please read the following to your 911 representative:</h3>
          <br/>
          <h3 style={{fontStyle: 'italic', fontWeight: 100}}>
            To receive information about my missing child or loved one, I can send you a link via SMS from God’s Child Id. Message and data rates may apply. This is a one time message. For more information, see our Terms of Service and Privacy Policy at https://godschildid.com/. Do you agree to receive this message?”
           </h3>
           <br/>
           <h3> 
            The 911 representative must verbally agree (“Yes”) before pressing send below.
          </h3>
          </div>
          }
        <br /><br />
        <div style={{ float: 'right', display: 'flex', gap: '5px' }}>
          <Button variant="outline" onClick={yes} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Send
          </Button>
          <Button variant="outline" onClick={no} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
            Cancel
          </Button>
        </div>
      </section>
    </div>
  );
}