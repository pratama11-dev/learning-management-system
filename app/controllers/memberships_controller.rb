# frozen_string_literal: true

class MembershipsController < ApplicationController
  layout 'homes'
  before_action :require_login, only: :index
  def index; end

  def new; end

  def payment; end
end
