import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require('./models/AllGamesInfo'));
app.model(require('./models/UserInfo'));
app.model(require('./models/RoomInfo'));

// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

