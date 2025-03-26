// ==== FRONTEND (VideoPlayer.js) ====

import React, { useRef, useEffect, useState } from 'react';
import { ContentCopy, Videocam, VideocamOff } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { flexbox } from '@mui/system';

const backendURL = window.location.hostname.includes("localhost")
    ? "http://localhost:5000"
    : import.meta.env.VITE_BACKEND_URL;

const socket = io(backendURL, {
    transports: ["websocket"],
});


<p style={{ color: 'white' }}>
    Socket status: {socket.connected ? '🟢 Connected' : '🔴 Disconnected'}
</p>




const generatePasskey = () => Math.random().toString(36).substring(2, 10);

const VideoPlayer = ({ videoId, onSessionJoin = () => {} }) => {
    const videoRef = useRef(null);
    const [canPlay, setCanPlay] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [inputSession, setInputSession] = useState('');
    const [videoChatActive, setVideoChatActive] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);

    useEffect(() => {
        if (canPlay && videoRef.current) {
            console.log("Reloading video source");
            videoRef.current.load();
        }
    }, [canPlay]);

    const startNewSession = () => {
        const newSession = generatePasskey();
        console.log("Creating session:", newSession);
        setSessionId(newSession);
        socket.emit("create-session", newSession);
    };

    const joinSession = () => {
        console.log("Trying to join session:", inputSession);
        socket.emit("verify-session", inputSession, (isValid) => {
            if (isValid) {
                console.log("Session valid, joining...");
                setSessionId(inputSession);
                socket.emit("join-session", inputSession);
                setCanPlay(true);
                alert("✅ Passkey verified");

                // Call the function to notify UserHomePage
                onSessionJoin();
            } else {
                alert("❌ Invalid passkey");
            }
        });
    };

    const startVideoChat = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            localVideoRef.current.srcObject = stream;
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });

            stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

            peerConnection.current.ontrack = (event) => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            socket.on('offer', async ({ offer, sessionId }) => {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.emit('answer', { answer, sessionId });
            });

            socket.on('answer', async ({ answer }) => {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            });

            socket.on('candidate', async ({ candidate }) => {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            });

            setVideoChatActive(true);
        });
    };

    const stopVideoChat = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        if (peerConnection.current) peerConnection.current.close();
        setVideoChatActive(false);
    };

    return (
        <div style={{ textAlign: 'center', background: '#000000',height:"150vh", }}>
            <div style={{ padding: '30px' }}>
                <button
                    style={{
                        padding: "10px 20px",
                        background: "#6200ea",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(0.8)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(0.9)")}
                    onClick={startNewSession}
                >
                    Start New Session
                </button>

                <input
                    type="text"
                    value={inputSession}
                    onChange={(e) => setInputSession(e.target.value)}
                    placeholder="Enter Passkey"
                />
                <button style={{
                    padding: "10px 20px",
                    background: "#6200ea",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(0.8)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(0.9)")} onClick={joinSession}>Join Session</button>
                {sessionId && (
                    <span style={{ marginLeft: '10px',color:"white", }}>
                        Passkey: {sessionId} <ContentCopy onClick={() => navigator.clipboard.writeText(sessionId)} style={{ cursor: 'pointer' }} />
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px' }}>
                {/* 🎥 Video Player Box */}
                <video
                    ref={videoRef}
                    width="700"
                    height="396"
                    controls
                    style={{ display: canPlay ? 'block' : 'none', border: '2px solid black' }}
                >
                    <source
                        src={`${window.location.hostname.includes("localhost")
                            ? "http://localhost:3000"
                            : import.meta.env.REACT_APP_VIDEO_URL
                            }/videos/${videoId}`}
                        type="video/mp4"
                    />

                    Your browser does not support the video tag.
                </video>

                {/* 🎤 Video Chat Box */}
                {canPlay && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {videoChatActive ? (
                            <VideocamOff onClick={stopVideoChat} style={{ fontSize: '30px', cursor: 'pointer', color: 'red' }} />
                        ) : (
                            <Videocam onClick={startVideoChat} style={{ fontSize: '30px', cursor: 'pointer', color: 'green' }} />
                        )}
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            width="200"
                            height="150"
                            style={{ margin: '10px', border: '1px solid black',background:"grey", }}
                        />
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            width="200"
                            height="150"
                            style={{ margin: '10px', border: '1px solid black',background:"grey", }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
