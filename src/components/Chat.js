import React, { useEffect, useRef } from 'react';
import { Grid, Typography, CircularProgress, Button, TextField } from '@material-ui/core';
import useFetchChat from '../composables/useFetchChat';
import Alert from '@material-ui/lab/Alert';
import { formatDistanceToNow } from 'date-fns';
import { timestamp } from '../firebase/config';
import useGetUser from '../composables/useGetUser';
import useFetchOne from '../composables/useFetchOne';
import placeholder from '../assets/placeholder2.png';
import useDocument from '../composables/useDocument';

import './chat.css';

const Chat = (props) => {
	const { dataChat, errorChat, isPendingChat } = useFetchChat(
		'cafes',
		props.cafeId,
		'tables',
		props.tableId,
		'ChatCollection'
	);
	const { user } = useGetUser();
	const { data } = useFetchOne('users', user.uid);
	const { addChat, isPending, error } = useDocument();
	const endMsgBoxRef = useRef();

	const handleMsg = (e) => {
		const value = e.target.value;
		const key = e.key;
		if (key === 'Enter' && value !== '') {
			if (user) {
				const msg = {
					createdAt: timestamp(),
					message: value,
					name: user.displayName,
					userImg: data ? data.pictureURL : ''
				};
				addChat(msg, 'cafes', 'tables', 'ChatCollection', props.cafeId, props.tableId);
				if (!isPending && error === null) {
					e.target.value = '';
					endMsgBoxRef.current.scrollIntoView({ behavior: 'smooth' });
				}
			} else {
				// console.log('error');
			}
		}
	};

	useEffect(() => {
		endMsgBoxRef.current.scrollIntoView();
	});
	return (
		<Grid item xs={12} className="Chat">
			<Grid item xs={12} className="chat-box">
				{errorChat && <Alert severity="error">{errorChat}</Alert>}
				{isPendingChat && <CircularProgress />}
				{dataChat &&
					dataChat.map((msg) => {
						let time = formatDistanceToNow(msg.createdAt.toDate());
						return (
							<Grid key={msg.id} align="left" className="msg">
								<div className="chat-user">
									<div>
										<img
											src={msg.userImg ? msg.userImg : placeholder}
											alt="user"
										/>
										<Typography>{msg.name}</Typography>
									</div>
									<Typography>{time}</Typography>
								</div>
								<Typography className="chat-msg">{msg.message}</Typography>
							</Grid>
						);
					})}
				<div ref={endMsgBoxRef} className="scroll-div" />
			</Grid>
			<Grid item xs={12} className="chat-control">
				<Button onClick={() => props.clickNav('voice')}>
					<i className="fas fa-chevron-left" />
				</Button>
				<Button>
					<i className="fas fa-smile" />
				</Button>
				<TextField
					variant="outlined"
					name="msg"
					placeholder="Write here"
					onKeyDown={(e) => handleMsg(e)}
				/>
				<Button>
					<i className="fas fa-ellipsis-v" />
				</Button>
			</Grid>
		</Grid>
	);
};

export default Chat;
