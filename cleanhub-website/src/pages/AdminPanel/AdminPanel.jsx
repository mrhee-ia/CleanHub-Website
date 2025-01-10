import { useEffect, useState } from "react";
import styles from './AdminPanel.module.css'
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx"
import { Link, useNavigate } from 'react-router-dom'
import { FaPowerOff } from "react-icons/fa";

const AdminPanel = () => {

    const [pendingPosts, setPendingPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState([]);
    const { setUser, token, setToken } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {

      if (!token) {
        navigate('/join-now');
        return;
      }

      fetchPosts();
    }, []);

    const fetchPosts = async () => {
    try {
      const pendingResponse = await axiosClient.get("/admin/manage-posts?status=pending");
      setPendingPosts(pendingResponse.data);
      const approvedResponse = await axiosClient.get("/admin/manage-posts?status=approved");
      setApprovedPosts(approvedResponse.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // const fetchPosts = () => {
    //   axiosClient.get("/admin/manage-posts?status=pending")
    //     .then((pendingResponse) => {
    //       setPendingPosts(pendingResponse.data);
    //     }).catch((error) => {
    //       console.error(error)
    //     })
    //   axiosClient.get("/admin/manage-posts?status=approved")
    //     .then((approvedResponse) => {
    //       setApprovedPosts(approvedResponse.data);
    //     }).catch((error) => {
    //       console.error(error)
    //     })
    // }

    const handleApprove = async (postId) => {
      try {
        const response = await axiosClient.put(`/admin/approve-post/${postId}`, {approved_status: true});
        alert("Post approved successfully!");
        
        setPendingPosts((prevPosts) => prevPosts.filter(post => post.id != postId));
        setApprovedPosts((prevPosts) => [...prevPosts, response.data.job]);
      } catch (error) {
          console.error("Error approving post:", error);
          alert("Failed to approve post.");
      }
    };

    const handleDeny = async (postId) => {
        try {
          await axiosClient.post(`/admin/deny-post/${postId}`);
          alert("Post denied and deleted successfully!");
          fetchPosts();
        } catch (error) {
          console.error("Error denying post:", error);
          alert("Failed to deny post.");
        }
    };

    const handleDelete = async (postId) => {
        try {
          await axiosClient.delete(`/admin/delete-post/${postId}`);
          alert("Post deleted successfully!");
          fetchPosts(); // Refresh posts
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post.");
        }
    };

    const logout = (event) => {
      event.preventDefault()
      axiosClient.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
          localStorage.removeItem('ACCESS_TOKEN');
          navigate('/')
        })
    }

    return (
        <div className={styles['adminPanel']}>
          <h1>Admin Panel</h1>
          
          {/* Pending Posts */}
          <section className={styles['admin-section']}>
            <h2>Pending Posts</h2>
            {pendingPosts.length === 0 ? (<p>No pending posts.</p>) : (
              <ul>
                {pendingPosts.map((post) => (
                  <li key={post.id} className={styles['post']}>
                    <div>
                      <h3><Link to={`/jobs/${post.id}`}>{post.title}</Link></h3>
                    </div>
                    <div>
                      <button className={styles['approveButton']} onClick={() => handleApprove(post.id)}>Approve</button>
                      <button className={styles['denyButton']} onClick={() => handleDeny(post.id)}>Deny</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          
          {/* Approved Posts */}
          <section className={styles['admin-section']}>
            <h2>Approved Posts</h2>{approvedPosts.length === 0 ? (<p>No approved posts.</p>) : (
              <ul>
                {approvedPosts.map((post) => (
                  <li key={post.id} className={styles['post']}>
                    <div>
                      <h3><Link to={`/jobs/${post.id}`}>{post.title}</Link></h3>
                    </div>
                    <div>
                      <button className={styles['deleteButton']} onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <Link to="/" onClick={logout} className={styles['admin-logout']}><FaPowerOff />Log Out</Link>
        </div>
    );
}

export default AdminPanel