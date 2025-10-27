import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
import './signup-code-popup.css';
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { isValidSignupCode } from '@/data/getSignupCodes';

export default function SignupCodePopup ({ show, complete, handleClose }) {
        const showHideClassName = show ? 'modal display-block' : 'modal display-none';
        const [hasError, setHasError] = useState(false);
        const [code, setCode] = useState('');

        const router = useRouter();

      useEffect(() => {}, [show]);

      const yes = async () => {
        const isValid = await isValidSignupCode(code);
        setHasError(!isValid);
        setCode(isValid ? 'true' : '');
        if (isValid) {
          sessionStorage.setItem('signupCode', code);
          complete();
          handleClose();
        }
      }

      const no = () => {
        setHasError(false);
        handleClose();
      }

      const toClose = () => {}

        return (
          <div className={showHideClassName}>
            <section className="modal-main">
              <div style={{display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue'}}>
                <h1 style={{padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700}}>
                  SIGNUP CODE
                </h1>
                {/* <button type="button" className="close-btn" onClick={handleClose}>x</button>  */}
                <Button size="icon" style={{background: 'transparent', color: 'black'}}
                onClick={toClose}><X /></Button>
              </div>
              <br/><br/>
                  <h2  style={{color: 'black'}}>Please enter your signup code. Once verified, you may continue signing up</h2>
                  <br/>
                  {hasError && <span style={{color: 'red'}}>Code invalid</span>}
                  <Input className='w-100'  style={{color: 'black'}} type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                  <br/><br/>
                  <div style={{float: 'right', display: 'flex', gap: '5px'}}>
                  <Button variant="outline" onClick={yes} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    Verify
                  </Button>
                  <Button variant="outline" onClick={no} style={{ width: '100px', background: 'midnightblue', color: 'lightgoldenrodyellow' }}>
                    Close
                  </Button>
                  </div>
            </section>
          </div>
        );
      }

// export default FlyerInfoPopup;
