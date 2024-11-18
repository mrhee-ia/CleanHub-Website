import { useRef, Suspense} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const styles = {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1'
}

const Stars = (props) => {

    const ref = useRef();
    const sphere = random.inSphere(new Float32Array(7000), { radius: 2.5 });
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta/10;
        ref.current.rotation.y -= delta/15;
    })

    return (
        <group rotation={[0, 0, Math.PI/4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}/>
            </Points>
        </group>
    )
}

const StarsCanvas = () => {
    return (
        <div style={styles}>
            <Canvas camera={{ position: [0, 0, 3] }}>
                <Suspense fallback={null}>
                    <Stars/>
                </Suspense>
                <Preload all/>
            </Canvas>
        </div>
    )
}

export default StarsCanvas