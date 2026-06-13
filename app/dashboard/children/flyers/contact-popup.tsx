import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { X, CircleX } from "lucide-react"; 
import './contact-popup.css';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ContactPopup({ show, handleClose, type, value }: {
  show: boolean;
  handleClose: (type: 'email' | 'text' | undefined, value: string | undefined) => void;
  type: 'email' | 'text';
  value: string;
}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [sendValue, setSendValue] = useState(value);
  const [hasChecked, setHasChecked] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const formatPhoneNumber = (val: string) => {
    let digits = val.replace(/\D/g, '');
    if (digits.startsWith('+')) digits = digits.substring(1);
    if (digits.startsWith('1')) digits = digits.substring(1);
    
    digits = digits.slice(0, 10);
    const len = digits.length;
    if (len <= 3) return digits;
    if (len <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  useEffect(() => {
    if (show) {
      setSendValue(type === 'text' ? formatPhoneNumber(value) : value);
      setIsTouched(false);
      if (type === 'email') setHasChecked(true);
    }
  }, [show, type, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    const input = e.target.value;
    setSendValue(type === 'text' ? formatPhoneNumber(input) : input);
  };

  const handleClear = () => {
    setSendValue('');
    setIsTouched(false);
  };

  const rawDigits = sendValue.replace(/\D/g, '');
  const isPhoneValid = rawDigits.length === 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sendValue.trim());

  const showError = isTouched && (type === 'text' ? !isPhoneValid : !isEmailValid);
  const canSubmit = type === 'text' ? (isPhoneValid && hasChecked) : isEmailValid;

  const yes = () => {
    if (!canSubmit) return;
    const finalValue = type === 'text' ? `+1${rawDigits}` : sendValue;
    setHasChecked(false);
    handleClose(type, finalValue);
  }

  const no = () => {
    setHasChecked(false);
    handleClose(undefined, undefined);
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ display: 'inline-flex', width: '100%', borderBottom: 'thin solid slateblue', alignItems: 'center' }}>
          <h1 style={{ padding: '10px 1px', flex: 1, color: 'midnightblue', fontWeight: 700 }}>
            {type === 'email' ? "EMAIL FLYER" : "TEXT FLYER"}
          </h1>
          <Button size="icon" style={{ background: 'transparent', color: 'black' }} onClick={no}><X /></Button>
        </div>
        
        <br /><br />
        
        {/* Container for Input + Clear Button */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
          <Input 
            className='w-100' 
            type={type === 'text' ? "tel" : "email"} 
            value={sendValue} 
            onChange={handleInputChange} 
            maxLength={type === 'text' ? 14 : undefined}
            style={{
              width: '100%',
              paddingRight: '40px', 
              borderColor: showError ? '#ef4444' : undefined,
              borderWidth: showError ? '2px' : '1px'
            }} 
            placeholder={type === 'text' ? '(555) 555-5555' : 'Enter email address'}
          />
          {sendValue && (
            <button
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '10px',
                top: 0,
                bottom: '14px',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0
              }}
            >
              <CircleX size={18} />
            </button>
          )}
        </div>

        {showError && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
            {type === 'text' ? 'Please enter a 10-digit phone number' : 'Please enter a valid email address'}
          </p>
        )}

        {type === 'text' &&
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: 'black', fontWeight: 100, fontStyle: 'italic', fontSize: '0.85rem', lineHeight: '1.4' }}>
              You are requesting a link to the flyer to be texted from <b>(984) 230-9387</b>. 
              Msg/data rates apply. See our 
              &nbsp;<Link href="https://www.godschildid.com" target="_blank" style={{ color: 'blue', textDecoration: 'underline' }}>Terms</Link> 
              &nbsp;&&nbsp;
              <Link href="https://www.godschildid.com" target="_blank" style={{ color: 'blue', textDecoration: 'underline' }}>Privacy</Link>.
            </h3>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Input 
                type="checkbox" 
                style={{ 
                  transform: 'scale(0.65)', 
                  width: '30px', 
                  marginRight: '10px', 
                  cursor: 'pointer' 
                }}
                checked={hasChecked} 
                onChange={e => setHasChecked(e.target.checked)} 
              />
              <label style={{ color: 'black', cursor: 'pointer', paddingBottom: '7px' }} onClick={() => setHasChecked(!hasChecked)}>
                I agree
              </label>
            </div>
          </div>
        }
        
        <br /><br />
        
        <div style={{ float: 'right', display: 'flex', gap: '8px' }}>
          <Button 
            onClick={yes} 
            disabled={!canSubmit}
            style={{ width: '100px', background: 'midnightblue', color: 'white', opacity: canSubmit ? 1 : 0.5 }}
          >
            Send
          </Button>
          <Button 
            variant="outline" 
            onClick={no} 
            style={{ width: '100px', background: 'midnightblue', border: '1px solid midnightblue' }}
          >
            Cancel
          </Button>
        </div>
      </section>
    </div>
  );
}
