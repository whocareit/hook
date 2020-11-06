import React, { useState, useEffect } from 'react';


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
function App() {
    const [ count, setCount ] = useState(0);
    useEffect(() => {
        document.write = `you click ${count} times` 
        
    })
    return (
        <div>
            <p>you click {count} times</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}

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

export default App