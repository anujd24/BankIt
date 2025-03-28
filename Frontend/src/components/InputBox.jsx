import React from 'react';

export function InputBox({ label, placeholder, onChange, type = "text" }) {  // ✅ Added `type` prop
    return (
        <div style={styles.container}>
            <div style={styles.label}>{label}</div>
            <input 
                type={type} 
                onChange={onChange} 
                placeholder={placeholder} 
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    container: {
        marginBottom: '1rem',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'left',
        paddingBottom: '8px',
        color: '#00FF7F', // Neon green for label
        textShadow: '0 0 5px rgba(0, 255, 127, 0.8)',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '0.375rem',
        border: '2px solid #00FF7F', // Neon green border
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
        color: '#ffffff', // White text color
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        outline: 'none',
    },
};

// Add focus styles
styles.input.focus = {
    borderColor: '#33FF66', // A brighter neon green when focused
    boxShadow: '0 0 5px rgba(51, 255, 102, 0.8)', // Glowing effect on focus
};
