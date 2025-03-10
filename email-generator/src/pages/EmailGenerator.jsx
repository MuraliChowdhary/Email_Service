// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// const EmailGenerator = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         description: '',
//         recipient: ''
//     });
//     const [generatedEmail, setGeneratedEmail] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post('http://localhost:5000/api/generate-email', formData);


//             localStorage.setItem('emailContent', JSON.stringify(response.data));

//             console.log(response.data);
//             setIsLoading(false);
//             setGeneratedEmail(true);
//         } catch (err) {
//             setError('Failed to generate email. Please try again.');
//             setIsLoading(false);
//         }
//     };

//     const handleSendEmail = async () => {
//         setIsLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         const emailContent = localStorage.getItem('emailContent');

//         if (!emailContent) {
//             setError('No email content found. Please generate an email first.');
//             setIsLoading(false);
//             return;
//         }
//         const { id } = JSON.parse(emailContent);

//         try {
//             await axios.post('http://localhost:5000/api/send-email', { id: id });
//             setSuccessMessage('Email sent successfully!');
//             setIsLoading(false);
//         } catch (err) {
//             setError('Failed to send email. Please try again.');
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center py-12 text-black">
//             <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-gray-200">
//                 <h1 className="text-3xl font-bold text-center mb-6">AI Personalized Email Generator</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         placeholder="Enter Subject"
//                         className="w-full p-2 border rounded-md"
//                         required
//                     />
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         placeholder="Enter Description"
//                         className="w-full p-2 border rounded-md"
//                         required
//                     ></textarea>
//                     <input
//                         type="text"
//                         name="recipient"
//                         value={formData.recipient}
//                         onChange={handleChange}
//                         placeholder="Recipient Email"
//                         className="w-full p-2 border rounded-md"
//                         required
//                     />
//                     <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md" disabled={isLoading}>
//                         {isLoading ? 'Generating...' : 'Generate Email'}
//                     </button>
//                 </form>

//                 {
//   generatedEmail && (() => {
//     const emailData = JSON.parse(localStorage.getItem("emailContent") || "{}");

//     return (
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold">Generated Email</h2>
//         {/* <div className="p-4 bg-gray-100 rounded-md">
//           <p><span className="font-semibold">Subject:</span> {(emailData.subject || "N/A")}</p>
//           <p><span className="font-semibold">Description:</span> {(emailData.body || "N/A")}</p>
//           <p><span className="font-semibold text-xl mt-5">Recipient:</span> {(emailData.recipient || "N/A")}</p>
//         </div> */}
//         <button onClick={handleSendEmail} className="w-full p-2 bg-green-500 text-white rounded-md" disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send Email'}
//         </button>
//       </div>
//     );
//   })()
// }



//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//                 {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//             </div>
//         </div>
//     );
// };

// export default EmailGenerator;
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EmailGenerator = () => {
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        recipient: ''
    });
    const [generatedEmail, setGeneratedEmail] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post('http://localhost:5000/api/generate-email', formData);
            localStorage.setItem('emailContent', JSON.stringify(response.data));
            setGeneratedEmail(true);
            setSuccessMessage('Email generated successfully!');
        } catch (err) {
            setError('Failed to generate email. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSendEmail = async () => {
        setIsSending(true);
        setError(null);
        setSuccessMessage(null);

        const emailContent = localStorage.getItem('emailContent');
        if (!emailContent) {
            setError('No email content found. Please generate an email first.');
            setIsSending(false);
            return;
        }
        const { id } = JSON.parse(emailContent);

        try {
            await axios.post('http://localhost:5000/api/send-email', { id });
            setSuccessMessage('Email sent successfully!');
        } catch (err) {
            setError('Failed to send email. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex justify-center py-12 text-black">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-6">AI Personalized Email Generator</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter Subject"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        className="w-full p-2 border rounded-md"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        placeholder="Recipient Email"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md" disabled={isGenerating || isSending}>
                        {isGenerating ? 'Generating...' : 'Generate Email'}
                    </button>
                </form>
                {generatedEmail && (() => {
                    const emailData = JSON.parse(localStorage.getItem("emailContent") || "{}");
                    return (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Generated Email</h2>
                            <button onClick={handleSendEmail} className="w-full p-2 bg-green-500 text-white rounded-md" disabled={isGenerating || isSending}>
                                {isSending ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    );
                })()}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
};

export default EmailGenerator;
