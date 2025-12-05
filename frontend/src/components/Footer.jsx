import React from 'react'
export default function Footer(){
return (
<footer className="bg-white border-t py-6 mt-8">
<div className="container mx-auto text-center text-sm text-gray-600">© {new Date().getFullYear()} TinyLink</div>
</footer>
)
}