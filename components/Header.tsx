export default function Header() {
  return (
    <header>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl" href="/">Fresh x micro CMS</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
