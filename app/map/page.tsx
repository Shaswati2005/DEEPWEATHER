'use client'

import React from 'react'
import MapComponent from '@/components/MapComponent';

export default function MapPage() {
    return (
        <div>
            <h1>Map Example</h1>
            <MapComponent center={[40.7128, -74.0060]} zoom={10} /> {/* New York */}
        </div>
    );
}
