import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import '../../css/vpc.css';


interface ModalComponentProps {
    isModalOpen: boolean;
    onRequestClose: () => void;
    selectedRouteTable: any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isModalOpen, onRequestClose, selectedRouteTable }) => {

    const [selectedTab, setSelectedTab] = useState(1);
    const [showCopiedPopup, setShowCopiedPopup] = useState(false);

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setShowCopiedPopup(true);
    };

    const renderLabelsTable = (labels) => {
        if (labels && Object.keys(labels).length > 0) {
            return (
                <>
                    <p className="text-sm">Click to copy and paste (tag, value) pair.</p>
                    <table className="text-sm mt-3" style={{ padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5', width: "100%" }}>
                        <thead style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                            <tr>
                                <th className="p-2">Tag</th>
                                <th className="p-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(labels).map(([key, value], index, array) => (
                                <React.Fragment key={index}>
                                    <tr className="even:bg-gray-100" onClick={() => handleCopyToClipboard(`${key}: ${value}`)}>
                                        <td className="p-2">{key}</td>
                                        <td className="p-2">{String(value)}</td>
                                    </tr>
                                    {showCopiedPopup && (
                                        <div style={{ position: 'absolute', left: '20px', top: '20px', background: 'white', border: '1px solid black', padding: '8px' }}>
                                            Copied to clipboard!
                                        </div>
                                    )}
                                    {index !== array.length - 1 && (
                                        <tr>
                                            <td style={{ color: 'rgb(245, 245, 245)' }} colSpan={2}><hr /></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            );
        } else {
            return <p className="mt-2 text-sm">No labels avaliable.</p>;
        }
    };

    return (
        // Modal component 
        <Modal
            isOpen={isModalOpen}
            shouldCloseOnOverlayClick={false}
            shouldFocusAfterRender={false}
            shouldReturnFocusAfterClose={false}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'transparent',
                    pointerEvents: 'none'
                },
                content: {
                    position: 'absolute',
                    top: '7%',
                    left: '65%',
                    right: '0%',
                    bottom: '0%',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    zIndex: 1000,
                    pointerEvents: 'auto',
                }
            }}
        >

            {/* close button */}
            <button
                className="modal-close-button"
                onClick={onRequestClose}
            >
                Close
            </button>


            {/* modal content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ textAlign: 'left', marginTop: '50px' }} // Align text to the left
            >
                {selectedRouteTable ? (
                    <>
                        <div style={{ backgroundColor: '#F5F5F5', padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5' }}>
                            <h1 style={{ fontWeight: 'bold', color: 'black', fontSize: '1em' }}>Resource summary for {selectedRouteTable.name} ({selectedRouteTable.id})</h1>
                        </div>
                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5', borderTopColor: '#F0F0F0' }}>
                            <div className="grid grid-cols-2 gap-5 text-sm ml-1">
                                <div className="text-gray-400 mt-5">
                                    Name
                                    <div className="text-black" >
                                        {selectedRouteTable.name || 'N/A'}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-5">
                                    Route Table ID
                                    <div className="text-black" >
                                        {selectedRouteTable.id}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-5">
                                    VPC ID
                                    <div className="text-black" >
                                        {selectedRouteTable.vpcId}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-5">
                                    Region
                                    <div className="text-black">
                                        {selectedRouteTable.region}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-5">
                                    Provider
                                    <div className="text-black">
                                        {selectedRouteTable.provider}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-5">
                                    Project
                                    <div className="text-black" >
                                        {selectedRouteTable.project || "N/A"}
                                    </div>
                                </div>
                                <div className="text-gray-400 mt-2">
                                    Self Link
                                    <div className="text-blue-500 hover:text-blue-400" >
                                        <a target="_blank" href={selectedRouteTable.selfLink}>Click Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex text-black-900 font-semibold text-sm" style={{ backgroundColor: '#F5F5F5', padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5' }}>
                            <div className={`flex-1 text-center border-r border-gray-400 cursor-pointer px-2 ${selectedTab === 1 ? 'pb-2 border-b-2 border-black' : ''}`} onClick={() => setSelectedTab(1)}>Tags</div>
                            <div className={`flex-1 text-center border-r border-gray-400 cursor-pointer px-2 ${selectedTab === 2 ? 'pb-2 border-b-2 border-black' : ''}`} onClick={() => setSelectedTab(2)}>Routes</div>
                            <div className={`flex-1 text-center cursor-pointer px-2 ${selectedTab === 3 ? 'pb-2 border-b-2 border-black' : ''}`} onClick={() => setSelectedTab(3)}>Status</div>
                        </div>
                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5' }}>
                            {selectedTab === 3 &&
                                <div>
                                    <h2 className="text-black font-semibold">Status Information</h2>
                                    <div className="flex grid grid-cols-2">
                                        <div className="flex justify-between pb-100">
                                            <div className="text-gray-400 mt-2">
                                                <div className="text-black" >
                                                    Instance 1: Offline
                                                </div>
                                            </div>
                                            <div className="text-gray-400 mt-2">
                                                <div className="text-black" >
                                                    Instance 2: Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {selectedTab === 2 &&
                                <div>
                                    <h2 className="text-black font-semibold">Route List</h2>
                                    <table className="text-sm mt-3" style={{ padding: '10px', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', border: '1px solid #F5F5F5', width: "100%" }}>
                                        <thead style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                                            <th className="p-2">Destination</th>
                                            <th className="p-2">Target</th>
                                            <th className="p-2">Status</th>
                                        </thead>
                                        <tbody>
                                            {selectedRouteTable.routes ? (
                                                Object.values(selectedRouteTable.routes).map((route, index, array) => (
                                                    <React.Fragment key={index}>
                                                        <tr className="even:bg-gray-100">
                                                            <td className="p-2">{(route as any).array[0]}</td>
                                                            <td className="p-2">{(route as any).array[1]}</td>
                                                            <td className="p-2">{(route as any).array[2]}</td>
                                                        </tr>
                                                        {index !== array.length - 1 && (
                                                            <tr>
                                                                <td style={{ color: 'rgb(245, 245, 245)' }} colSpan={4}><hr /></td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="p-2 text-center">No rules available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>}
                            {selectedTab === 1 &&
                                <div>
                                    <h2 className="text-black font-semibold">Tag Information</h2>
                                    {renderLabelsTable(selectedRouteTable.labels)}
                                </div>
                            }
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'red' }}>An error has occured. Please refresh your page.</p>
                )}
            </motion.div>
        </Modal>
    );
};

export default ModalComponent;