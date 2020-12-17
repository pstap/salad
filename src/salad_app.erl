%%%-------------------------------------------------------------------
%% @doc salad public API
%% @end
%%%-------------------------------------------------------------------

-module(salad_app).

-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    salad_sup:start_link().

stop(_State) ->
    ok.

%% internal functions
