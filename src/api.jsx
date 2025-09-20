const API_BASE_URL = "https://fashion-marketplace-backend.onrender.com";

// Load token from localStorage if it exists
let authToken = localStorage.getItem("authToken") || null;

/** ---------------- AUTH TOKEN HELPERS ---------------- */
export function setAuthToken(token) {
  authToken = token;
  localStorage.setItem("authToken", token);
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem("authToken");
}

/** ---------------- GENERIC REQUEST HANDLER ---------------- */
async function apiRequest(endpoint, { method = "GET", data = null } = {}) {
  const options = { method, headers: {} };

  // Attach Authorization if logged in
  if (authToken) {
    options.headers["Authorization"] = `Bearer ${authToken}`;
  }

  if (data) {
    if (data instanceof FormData) {
      // FormData → let browser set Content-Type
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
}

/** ---------------- AUTH ---------------- */
export function signupUser(data) {
  return apiRequest("/api/auth/register", { method: "POST", data });
}

export function loginUser(data) {
  return apiRequest("/api/auth/login", { method: "POST", data });
}

export function getCurrentUser() {
  return apiRequest("/api/auth/me");
}

/** ---------------- PRODUCTS ---------------- */
export function fetchProducts() {
  return apiRequest("/api/products");
}

export function fetchProductById(productId) {
  return apiRequest(`/api/products/${productId}`);
}

export function createProduct(data) {
  return apiRequest("/api/products", { method: "POST", data });
}

export function getVendorProducts(vendorId) {
  return apiRequest(`/api/products/vendor/${vendorId}`);
}

/** ---------------- ORDERS ---------------- */
// Don’t send customerId/vendorId → backend infers them
export function createOrder(items) {
  return apiRequest("/api/orders", { method: "POST", data: { items } });
}

export function fetchCustomerOrders(customerId) {
  return apiRequest(`/api/orders/customer/${customerId}`);
}

export function fetchVendorOrders(vendorId) {
  return apiRequest(`/api/orders/vendor/${vendorId}`);
}

export function updateOrderStatus(orderId, status) {
  return apiRequest(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    data: { orderStatus: status },
  });
}

// Generic fetchOrders (used by CartContext)
export function fetchOrders(userId, role = "customer") {
  const endpoint =
    role === "vendor"
      ? `/api/orders/vendor/${userId}`
      : `/api/orders/customer/${userId}`;
  return apiRequest(endpoint);
}

/** ---------------- REVIEWS ---------------- */
export function postReview(productId, {orderId,rating,comment}) 
{
  return apiRequest(`/api/reviews`, {
    method: "POST",
    data: {productId,orderId,rating,comment}},
  )
}

export function fetchProductReviews(productId) {
  return apiRequest(`/api/reviews/product/${productId}`);
}

export function getVendorReviews(vendorId) {
  return apiRequest(`/api/reviews/vendor/${vendorId}?t=${Date.now()}`, {
    method: "GET",
  });
}

/** ---------------- VENDOR PROFILE ---------------- */
export function saveVendorProfile(userId, profileData) {
  return apiRequest(`/api/auth/${userId}/profile`, {
    method: "PUT",
    data: profileData,
  });
}

export function getVendorProfile(userId) {
  return apiRequest(`/api/auth/${userId}/profile`);
}
