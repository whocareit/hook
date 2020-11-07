import React, { useState, useEffect } from 'react';
import useReducer from './hook/reducer';


// function FriendStatus(props) {
//     const [ isOnline, setIsOnline ] = useState(null);

//     useEffect(() => {
//         function handleStatusChange(status) {
//             setIsOnline(status.isOnline);
//         }
//         ChatAPI.subscribeToFriendStatus(props.friend.id,handleStatusChange);
//         return ChatAPI.unsubscribeToFriendStatus(props.friend.id, handleStatusChange);
//     })
//     if (isOnline == null) {
//         return 'loading...';
//     }
//     return isOnline ? 'Online' : 'Offline'
// }
// function App() {
//     const [ count, setCount ] = useState(0);
//     useEffect(() => {
//         document.write = `you click ${count} times` 
        
//     })
//     return (
//         <div>
//             <p>you click {count} times</p>
//             {/* <button onClick={() => setCount(count + 1)}>click</button> */}
//             <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//             <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//         </div>
//     )
// }

// export default App;
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         }
//     }
//     render(){
//         return (
//             <div>
//                 <div>
//              <p>your click {this.state.count} times</p>
//             <button onClick={() => this.setState({count: this.state.count+ 1})}>click</button>
//             </div>
//             </div>
//         )
//     }
// }

// const thems  = {
//     light: {
//         foreground: '#000',
//         background: "#eee"
//     },
//     drak: {

//     }
// }
// function App() {
//     return (
//         <ThemeContext.Provider value={thems.dark}></ThemeContext.Provider>
//     )
// }

function App() {
    const initialState = {count : 0};
    const [ state, dispatch] = useReducer(reducer, initialState);

    function reducer (state, action) {
        switch(action.type) {
            case 'increment': 
                return {count: state.count + 1};
            case 'devrement': 
                return {count: state.count - 1};
            default: 
                throw new Error();
        }
    }
    
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'devrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </div>
    )
}

export default App