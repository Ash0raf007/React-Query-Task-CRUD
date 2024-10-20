import NavBar from '@/components/NavBar';
import Providers from '../Provider';

const layout = ({children}) => {
  return (
    <div>
      <NavBar/>
      {/* import client provider   */}
<Providers>
{children}

</Providers>
    </div>
  )
}

export default layout
