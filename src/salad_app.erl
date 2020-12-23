%%%-------------------------------------------------------------------
%% @doc salad public API
%% @end
%%%-------------------------------------------------------------------

-module(salad_app).

-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    Routes = [{'_', [
                     {"/", cowboy_static, {priv_file, salad, "index.html"}},
                     {"/websocket", ws_h, []},
                     {"/static/[...]", cowboy_static, {priv_dir, salad, "static"}},
                     {"/script/[...]", cowboy_static, {priv_dir, salad, "script"}}
                    ]}],
    Dispatch = cowboy_router:compile(Routes),
    {ok, _} = cowboy:start_clear(http, [{port, 8080}], #{
                                                         env => #{dispatch => Dispatch}
                                                        }),
    salad_sup:start_link().

stop(_State) ->
    ok.

%% internal functions
