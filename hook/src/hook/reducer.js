import { useState  } from 'react';
// function useFriendStatus (friendId) {
//     const [ isOnline, setIsOnline ] = useState(null);

//     useEffect(() => {
//         function handleStatusChange(status) {
//             setIsOnline(status.isOnline);
//         }
//         ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
//         return () => {
//             ChatAPI.unsubscribeToFriendStatus(friendId, handleStatusChange);
//         }
//     })

//     return isOnline;
// }
//reducer的hook
function useReducer(reducer, initialState){
    //初始化state的值
    const [ state, setState ] = useState(initialState);

        function dispatch(action) {
            const nextState = reducer(state, action);
            setState(nextState);
        }
    return [ state,dispatch ];
}
export default useReducer;